<!-- ================================================= -->
<?php include 'DB.php';
    $tip = $_COOKIE['tip'];
?>
<!-- ================================================= -->
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <title>Review</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0 maximum-scale=1.0">
    <link rel="stylesheet" type="text/css" media="screen" href="style/styles_review.css" />
</head>

<body>
    <img id="review" src="style/images/review.png" alt="Review" draggable="false">
    <div id="facts" draggable="false">
        <ul>
            <div id="factList"></div>
        </ul>
    </div>    
    <script src="script/jquery-3.2.1.min.js"></script>
    <script src="script/factData.js"></script>
    <script src="script/didYouKnow.js"></script>
<!-- ================================================= -->
    <?php echo $tip; ?>
<!-- ================================================= -->
    <script src="script/fact.js"></script>

</body>

</html>