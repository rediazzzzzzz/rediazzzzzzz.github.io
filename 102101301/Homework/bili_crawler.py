# -*- coding: UTF-8 -*-
import re
import csv
import sys
import time
import random
import requests
from lxml import etree
from openpyxl import workbook  # Excel表格
import jieba
import collections
import re
from wordcloud import WordCloud
import matplotlib.pyplot as plt
import pandas as pd

class Spider(object):

    def __init__(self):
        # 哔哩哔哩搜索页接口请求地址
        self.url_1 = 'https://api.bilibili.com/x/web-interface/wbi/search/type?__refresh__=true&_extra=&context=&page={}&page_size=42&order=dm&from_source=&from_spmid=333.337&platform=pc&highlight=1&single_column=0&keyword=%E6%97%A5%E6%9C%AC%E6%A0%B8%E6%B1%A1%E6%9F%93%E6%B0%B4%E6%8E%92%E6%B5%B7&qv_id=kXsLUl6EKJaq5iNfdicro5ipuBMEthQT&ad_resource=5654&source_tag=3&gaia_vtoken=&category_id=&search_type=video&dynamic_offset=0&web_location=1430654&w_rid=8ea24daad5b04ba3e45bc43e7c0e2cf4&wts=1694408151'
        # 弹幕数据list.so请求地址
        self.url_2 = 'https://api.bilibili.com/x/v1/dm/list.so?oid={}'
        # 构造请求头 反爬之一
        self.headers = {
            # cookie具有时效性 需要定期更换 复制浏览器的headers信息
            'cookie': "buvid3=8CDCC607-B0B1-1EB9-781B-C3EC7A2217BC63698infoc; b_nut=1694519063; CURRENT_FNVAL=4048; _uuid=315C137C-D3104-46C7-DFE8-F16476CC2481086386infoc; buvid_fp=bf370dd81332df86363528d734225727; rpdid=|(JlklRl)~ll0J'uYmRlummu~; header_theme_version=CLOSE; home_feed_column=4; browser_resolution=1280-563; buvid4=6DD885E5-3B98-F5E9-29EF-8336992C52F963698-023091219-%2FKPDqUY3StEuxu39LYxiWw%3D%3D; SESSDATA=8e1bac0c%2C1710077846%2C93a86%2A92CjDSTJpzNBX0Adagzp_VX2uBnB1Gu5yY6KCDVx2HTa-Icx_8dOeHsZUJUGG29J_4MP4SVnA2QXpvbFdkeXBtLUFOcVJxcnlLa1RVVTBKNnFVVnRnTV9YZndsZzlDSnI3WUJpYmVoVV8zRXkxci1tYjBvNVJRQW5nQzVBamhncFlEZGtyX0VDUG9nIIEC; bili_jct=17a1af7b3c3ddcb4ec1605fa9d4de311; DedeUserID=1737175823; DedeUserID__ckMd5=8453a5f1dc5933fc; bp_video_offset_1737175823=840469621760852004; bili_ticket=eyJhbGciOiJIUzI1NiIsImtpZCI6InMwMyIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTQ3ODYyNjQsImlhdCI6MTY5NDUyNzA2NCwicGx0IjotMX0.RyM6ukNgj5_0fc5DhMDVoDGqjuY41vgKxWtkK1KL2LI; bili_ticket_expires=1694786264; b_lsid=210D2AC26_18A8C762454; sid=7xcvo8kc; PVID=1",
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
        }
        # 实例化workbook对象
        self.wb = workbook.Workbook()
        # 激活表格
        self.ws = self.wb.active
        # 写入表头
        self.ws.append(['弹幕内容'])

    def run(self):
        # 翻页采集10页 一页30条
        for page in range(1, 11):
            print(f'正在采集第{page}页的数据————')
            # 提取每一页的URL
            url = self.url_1.format(page)
            # 发送请求
            data = self.return_response(url).json()
            if data:
                # 解析数据 提取数据
                self.parse_data(data)
            else:
                continue

            #break

    def return_response(self, url):
        # 延时请求(反爬)
        random_time = random.uniform(1, 3)
        time.sleep(random_time)
        # 发送请求
        try:
            # 发送get请求
            response = requests.get(url, headers=self.headers)
            # 编码
            response.encoding = response.apparent_encoding
            if response.status_code == 200:
                return response
            else:
                print(response.status_code, '请求异常')
                return
        except Exception as e:
            print(f'except Exception as e:\n{e}')
            sys.exit(0)

    def parse_data(self, data):
        # 获取数据列表
        result = data['data']['result']
        # 循环取每个视频的链接地址
        i = 1
        for mes in result[:30]:
            # 提取视频链接
            url = mes['arcurl']
            # 提取cid号的URL链接
            str_list = list(url)
            str_list.insert(11, 'i')
            url = ''.join(str_list)

            # 发送详情页请求
            data = self.return_response(url).text
            # 获取弹幕cid号
            cid = self.parse_video_cid(data)
            # 提取弹幕链接
            href = self.url_2.format(cid)
            # 发送请求获取弹幕列表
            data = self.return_response(href).text

            # 解析并提取弹幕数据
            print(f'当前页一共{len(result[:30])}条视频\t\t正在采集第{i}条视频弹幕————')
            self.parse_subtitles(data)
            i += 1

    @staticmethod
    def parse_video_cid(data):
        # xpath使用
        xml = etree.HTML(data)
        # cid号定位提取
        cid = xml.xpath('//div[@id="dtl"]/div[2]/input[@class="form-control"]/@value')[0]
        return cid

    def parse_subtitles(self, data):
        # 正则表达式对网页源码进行解析提取弹幕内容
        barrages = re.findall('<d\sp=".*?">(.*?)</d>', data)
        # 循环取值
        for mes in barrages:
            # 去除弹幕中的空格换行等特殊字符
            content = re.sub(' |\n|\u200b|', '', mes)
            # 调用保存方法
            # 1.存为excel
            self.save_excel(content)
            # 2.存为csv
            self.save_csv(content)
            # 输出弹幕内容
            # print(content, '\n')
        print('=' * 100, '\n')

    def save_excel(self, content):
        # 存储弹幕文件到excel
        # 按行写入数据
        self.ws.append([content])
        # 保存本地
        self.wb.save('data.xlsx')

    @staticmethod
    def save_csv(content):
        # 写入csv表格
        with open('data.csv', 'a+', encoding='utf-8-sig', newline='') as f:
            writer = csv.writer(f)
            with open('data.csv', 'r', encoding='utf-8-sig', newline='') as F:
                reader = csv.reader(F)
                if not [row for row in reader]:
                    writer.writerow(['弹幕内容'])
                    writer.writerows([[content]])
                else:
                    writer.writerows([[content]])
def count_word():
	datas = pd.read_csv('data.csv',encoding = 'utf-8')
	times = datas.stack().value_counts()
	top20 = times.head(20).reset_index()
	top20.columns = ['弹幕内容','出现次数']
	print(top20)
def word_cloud():
    with open('data.csv','r',encoding = 'utf-8' ) as f:
        csv_reader = csv.reader(f)
        with open('data.txt', 'w',encoding = 'utf-8' ) as output_f:
            for row in csv_reader:
                output_f.write(','.join(row) + '\n')
    with open('data.txt',encoding='utf8') as f:
        fdata = f.read()
        new_data = re.findall('[\u4e00-\u9fa5]+',fdata,re.S)
        new_data = ''.join(new_data)
        seg_list = jieba.cut(new_data, cut_all=True)
        seg_list = list(seg_list)
        result_list = []
        for word in seg_list:
            if len(word) >1:
                result_list.append(word)
        word_counts = collections.Counter(result_list)
        my_cloud = WordCloud(
            font_path= "simsun.ttc",
            background_color='white',
            width=1200,
            height=1000,
            max_words=300,
            max_font_size=250,
            min_font_size=30,
            random_state=30,
            scale=10,
            colormap='cool',
        ).generate_from_frequencies(word_counts)
        my_cloud.to_file("my_cloud.jpg")
        plt.imshow(my_cloud, interpolation='bilinear')
        plt.axis('off')
        plt.show()


if __name__ == '__main__':
    # 爬虫程序入口
    Spider().run()
    count_word()
    word_cloud()
