<!doctype html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>@media queries example</title>
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="node_modules/slick-carousel/slick/slick.css">
    <link rel="stylesheet" href="node_modules/slick-carousel/slick/slick-theme.css">

    <script>
        // Picture element HTML5 shiv
        document.createElement( "picture" );
    </script>
    <script src="js/lib/picturefill.min.js"></script>
</head>
<body>
<div id="homeBanners" class="home-banner js-home-banner">
    <?php
    $images = [
        ['Matrix-Biolage_767x560.jpg', 'Matrix-Biolage_1920x850.jpg'],
        ['Matrix-Minerals_Mobile.jpg', 'Matrix-Minerals.jpg'],
        ['Matrix_OilWonders_767x560_1_.jpg', 'Matrix_OilWonders_1920x850_1_.jpg'],
        ['Matrix_Parikmaher_767x560.jpg', 'Matrix_Parikmaher_1920x850.jpg'],
        ['Matrix_Stile-Link_Image_767x560_1.jpg', 'Matrix_Stile-Link_Image_1920x850_6.jpg'],
        ['Matrix_SunSorials_767x560.jpg', 'Matrix_SunSorials_1920x850.jpg']
    ]; ?>

    <?php /* foreach ($images as $bannerSet): ?>
        <div class="home-banner-item">
            <div class="home-banner-item__image">
                <!-- Desktop -->
                <img src="img/<?php echo $bannerSet[1] ?>" class="hide-on-mobile home-banner-item__image-i"
                     alt="">

                <!-- Mobile -->
                <img src="img/<?php echo $bannerSet[0] ?>" class="only-mobile home-banner-item__image-i" alt="">
            </div>
        </div>
    <?php endforeach; */ ?>


    <?php foreach ($images as $bannerSet): ?>
        <div class="home-banner-item">
            <div class="home-banner-item__image">
                <picture>

                    <!--[if IE 9]><video style="display: none;"><![endif]-->
                    <!-- Большой баннер для десктопов -->
                    <source srcset="img/<?php echo $bannerSet[1] ?>" media="(min-width: 768px)">
                    <!--[if IE 9]></video><![endif]-->

                    <!-- Маленький баннер для мобил -->
                    <img srcset="img/<?php echo $bannerSet[0] ?>" alt="MDN">
                </picture>
            </div>
        </div>
    <?php endforeach; ?>

</div>

<script src="node_modules/jquery/dist/jquery.min.js"></script>
<script src="node_modules/slick-carousel/slick/slick.min.js"></script>
<script src="js/scripts.js"></script>
</body>
</html>