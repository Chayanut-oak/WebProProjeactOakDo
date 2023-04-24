<template>
<div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner" style="max-height: 400px">
    <div class="carousel-item active" data-bs-interval="5000">
        <img src="https://steamuserimages-a.akamaihd.net/ugc/1758063977689311647/5B4EF6286317D487022FAACCFFF7B87D7E090873/?imw=637&imh=358&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true" class="d-block w-100 p-5 "  alt="...">
  
    </div>
    <div class="carousel-item" data-bs-interval="5000">
      <img src="https://blog.startdee.com/hubfs/%E0%B9%81%E0%B8%9A%E0%B8%9A%E0%B9%80%E0%B8%A3%E0%B8%B5%E0%B8%A2%E0%B8%99%E0%B8%A0%E0%B8%B2%E0%B8%A9%E0%B8%B2%E0%B8%9E%E0%B8%B2%E0%B8%97%E0%B8%B5-1.webp" class="d-block w-100 p-5  " alt="...">
    
    </div>
    <div class="carousel-item" data-bs-interval="5000">
      <img src="https://www.pixelstalk.net/wp-content/uploads/images6/Manga-Wallpaper-Free-Download.jpg" class="d-block w-100 p-5 " alt="...">
    </div>
    <div class="carousel-item" data-bs-interval="5000">
      <img src="https://rare-gallery.com/mocahbig/393059-bleach-2021-manga-ichigo-4k-pc-wallpaper.jpg" class="d-block w-100 p-5 " alt="...">
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
</template>
<script>

export default {
name: 'EventBar',
}
</script>
<style>

.carousel-inner > .item {
   height: 400px;
}
</style>
