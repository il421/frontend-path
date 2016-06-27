<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/fancybox/2.1.5/jquery.fancybox.css">
</head>
<body>
<div class="page-header">
    <h1>Ботинки</h1>
</div>
<div class="category js-category">
    <div class="row">
        <?php for ($i = 1; $i <= 3; $i++): ?>
            <div class="col-sm-6 col-md-4">
                <div class="thumbnail">
                    <img src="holder.js/100px200">
                    <div class="caption">
                        <h3>Товар <?= $i; ?></h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At debitis eveniet, exercitationem
                            expedita laboriosam nam placeat! Doloribus ea ex natus provident rem temporibus
                            voluptatibus!
                            Aliquam architecto aspernatur aut veniam. Rerum!
                        </p>
                        <a href="buy.php?product_id=<?= $i; ?>"
                           class="btn btn-primary js-buy-product"><span>Купить</span></a>
                        <a href="wishlist.php?product_id=<?= $i; ?>" class="btn btn-default js-add-to-wishlist">Добавить
                            в вишлист</a>
                    </div>
                </div>
            </div>
        <?php endfor; ?>
    </div>
</div>
<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0/jquery.min.js"></script>
<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/holder/2.9.3/holder.js"></script>
<script type="text/javascript"
        src="//cdnjs.cloudflare.com/ajax/libs/fancybox/2.1.5/jquery.fancybox.pack.js"></script>
<script src="js/scripts.js"></script>
</body>
</html>
