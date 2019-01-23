<!-- ================================================= -->
<?php include 'DB.php';
    $quiz = $_COOKIE['quiz'];
?>
<!-- ================================================= -->
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <title>Food Waste Quiz</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0 maximum-scale=1.0">
    <link rel="stylesheet" type="text/css" media="screen" href="style/styles_quiz.css" />
</head>

<body>
    <img id="q" src="style/images/q.png" alt="Q:" draggable="false">

    <img id="qProgress" src="style/images/zero.png" alt="qProgress" draggable="false">
    <img id="qNo" src="style/images/of.png" alt="of" draggable="false">
    <img id="qTotal" src="style/images/five.png" alt="qTotal" draggable="false">


    <div class="button">
        <button id="btn1" type="button" onclick="getUserChoice('btn1')"></button>
        <button id="btn2" type="button" onclick="getUserChoice('btn2')"></button>
        <button id="btn3" type="button" onclick="getUserChoice('btn3')"></button>
        <button id="btn4" type="button" onclick="getUserChoice('btn4')"></button>
    </div>
    <p id="question"></p>
    <script src="script/jquery-3.2.1.min.js"></script>
    <script src="script/quizData.js"></script>
    <script src="script/quiz.js"></script>
<!-- ================================================= -->
    <?php echo $quiz;?>
<!-- ================================================= -->
    <script src="script/questionsAndAnswers.js"></script>
</body>

</html>