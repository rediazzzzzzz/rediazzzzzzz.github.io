package com.example.p1;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.content.Intent;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;


public class MainActivity extends AppCompatActivity {
    EditText acinput, keinput;
    String in1, in2;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        //获取按钮
        acinput = findViewById(R.id.acinput);
        keinput = findViewById(R.id.keinput);
        Button button = findViewById(R.id.to_register);

        //按钮进行监听
        Intent intent = new Intent(this, RegisterActivity.class);

        /**/button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //Intent intent = new Intent();
                in1 = acinput.getText().toString();
                in2 = keinput.getText().toString();
                Log.v("button", in1);
                intent.setClass(MainActivity.this,RegisterActivity.class);//动作：跳转
                startActivity(intent);//开始跳转
                finish();//销毁本页面
            }
        });

        Button bt_comment = findViewById(R.id.to_comment);
        bt_comment.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //Intent intent = new Intent();
                intent.setClass(MainActivity.this,CommentActivity.class);//动作：跳转
                startActivity(intent);//开始跳转
                finish();//销毁本页面
            }
        });
    }
}
