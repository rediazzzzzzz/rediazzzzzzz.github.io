package com.example.p1;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.RatingBar;
import androidx.appcompat.widget.Toolbar;

public class CommentActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.comment);

        Toolbar tb0 = findViewById(R.id.TB0);
        Button tj1 = findViewById(R.id.TJ1);
        EditText et1 = findViewById(R.id.ET1);
        RatingBar rt1 = findViewById(R.id.RT1);
        RatingBar rt2 = findViewById(R.id.RT2);

        tj1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String et = et1.getText().toString();
                Log.e("get edittext", "输入内容是: "+ et );
                float t1 = rt1.getRating();
                float t2 = rt2.getRating();
                Log.e("get ratingbar", "获取星级是： "+t1+"  "+t2 );
                Intent intent = new Intent();
                Log.d("register tag:","go to login");
            }
        });

        tb0.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent();
                intent.setClass(CommentActivity.this,MainActivity.class);//动作：跳转
                startActivity(intent);//开始跳转
                finish();//销毁本页面
            }
        });

    }
}