@extends('frontend.layouts.master')

@section('after-styles-end')
<link rel="stylesheet" href="/css/top/responsive.css">
<link rel="stylesheet" href="/css/top/line-icon.css">
<link rel="stylesheet" href="/css/top/main.css">
<link rel="stylesheet" href="/css/top/iphone5.css">
@endsection

@section('content')

<!-- header section -->
<section class="banner" role="banner">
  <header id="header">
    <div class="header-content clearfix">
      <a class="logo" href="/"><img height="60" src="/images/logo.png" alt=""></a> 
      <!-- navigation section  -->
      <nav class="navigation" role="navigation">
        <ul class="primary-nav">
          <li><a href="#banner">Home</a></li>
          <li><a href="#overview">Overview</a></li>
<!--           <li><a href="#features">Features</a></li>
 -->          <li><a href="#screens">Screenshots</a></li>
<!--           <li><a href="#contact">Contact</a></li>
 -->          <li><a href="/schools">関係者の方</a></li>
        </ul>
      </nav>
      <a href="#" class="nav-toggle">Menu<span></span></a>
    </div>
    <!-- navigation section  --> 
  </header>
</section>

<div class="background fullscreen" id="home">
<div class="overlay">
  <!-- container -->
  <div class="container clearfix fullscreen" style="height: 770px;">
    <div class="phone eight columns animated fadeInLeft">
      <div class="preview">
        <img src="images/app-screen/4.png" alt="">
      </div>
    </div>

    <div class="info eight columns animated fadeInRight" style="margin-top: 257px; bottom: 235; right: 0px;">
      <div class="logo">Re:act</div>
      <div class="welcome">双方向型講義を実現する</div>
      <div class="download">
        <div class="banner-btn">
          <a href="https://itunes.apple.com/jp/app/re-act/id1105304984?mt=8&ign-mpt=uo%3D4"><img src="images/apple-store-btn.png"></a>
          <a href="https://play.google.com/store/apps/details?id=com.optimind_react.reactadroid"><img src="images/google-store-btn.png"></a>
        </div>
      </div>
    </div>

  </div>
  <!-- container -->
  <div class="more"></div>
</div>
</div>
<!-- header section --> 

<!-- overview section -->
<section id="overview" class="section overview">
  <div class="container">
    <div class="row">
      <div class="col-md-8 col-md-offset-2 text-center">
        <h2 class="section-title">反応を促し、声をリアルタイムで伝えられる</h2>
        <p class="section-intro">
          Re:actを用いると、大学や講演会など大人数の講義において学生や聴講者の反応をリアルタイムで教師または講演者に伝えることが出来ます。
          <br/>
          <br/>
          聴講者はRe:actを通して「なるほど」「わからない」の反応と、メッセージを送信でき、
          周りの目を気にして「恥ずかしい」「講義の妨げになるのではないか」と、人前で手を上げて発言できない日本人のためのアプリです。
        </p>
      </div>
      <div class="col-md-12 text-center overview-video">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/XJ2nZL5Dabc" frameborder="0" allowfullscreen></iframe>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4 col-sm-12 "><span class="icon icon-browser"></span>
        <div class="overview-content">
          <h4>リアルタイム</h4>
          <p>ユーザーの反応は集計されたのち、リアルタイムで教師または講演者に届きます。</p>
        </div>
      </div>
      <div class="col-md-4 col-sm-12 "> <span class="icon icon-trophy"></span>
        <div class="overview-content">
          <h4>メッセージ機能</h4>
          <p>必要な場合は簡単なメッセージを送信することができます。もちろんこれもリアルタイムで教師または講演者に届きます。</p>
        </div>
      </div>
      <div class="col-md-4 col-sm-12 "> <span class="icon icon-lifesaver"></span>
        <div class="overview-content">
          <h4>使いやすいデザイン</h4>
          <p>少ない操作で利用できるので授業や講演の妨げになりません。</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- screen shots slider section-->
<!-- <section id="screens" class="section features1">
  <div class="container">
    <div class="row">
      <div class="col-md-8 col-md-offset-2 text-center">
        <h2 class="section-title">iPhone Android 両端末向けにアプリを公開<span></span></h2>
        <br/>
      </div>
    </div>
  </div>
  <div id="owl-demo" class="owl-carousel">
    <div class="item"><img width="281" height="500" src="images/app-screen/1.png"></div>
    <div class="item"><img width="281" height="500" src="images/app-screen/2.png"></div>
    <div class="item"><img width="281" height="500" src="images/app-screen/3.png"></div>
    <div class="item"><img width="281" height="500" src="images/app-screen/4.png"></div>
    <div class="item"><img width="281" height="500" src="images/app-screen/5.png"></div>
    <div class="item"><img width="281" height="500" src="images/app-screen/1.png"></div>
    <div class="item"><img width="281" height="500" src="images/app-screen/2.png"></div>
    <div class="item"><img width="281" height="500" src="images/app-screen/3.png"></div>
    <div class="item"><img width="281" height="500" src="images/app-screen/4.png"></div>
    <div class="item"><img width="281" height="500" src="images/app-screen/5.png"></div>
  </div>
</section> -->
<!-- screen shots slider section --> 

@include('frontend.includes.footer')

@endsection

@section('after-scripts-end')
    <script src="/js/top/jquery.subscribe.js"></script> 
    <script src="/js/top/jquery.contact.js"></script> 
    <script src="/js/top/main.js"></script>
@stop