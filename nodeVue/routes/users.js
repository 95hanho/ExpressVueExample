var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const db = require("./db");

const connection = db.connection;

// 로그인
router.post("/login", function (req, res) {
  const user = {
    id: req.body.user.id,
    password: req.body.user.password,
  };
  connection.query(
    'SELECT id, password FROM user where id ="' + user.id + '"',
    function (err, row) {
      if (row[0] == undefined) {
        res.json({
          success: false,
          message: "Login failed please check your id",
        });
        return;
      }
      if (row[0] !== undefined && row[0].userid === user.userid) {
        bcrypt.compare(user.password, row[0].password, function (err, res2) {
          if (res2) {
            res.json({
              // 로그인 성공
              success: true,
              message: "Login successful!",
            });
            return;
          } else {
            res.json({
              // 매칭되는 아이디는 있으나, 비밀번호가 틀린 경우
              success: false,
              message: "Login failed please check your password!",
            });
            return;
          }
        });
      }
    }
  );
});

// 유저 추가(회원 가입)
router.post("/userInput", (req, res) => {
  console.log(req.body);
  const user = {
    id: req.body.id,
    password: bcrypt.hashSync(req.body.password),
  };
  connection.query(
    'INSERT INTO USER VALUES("' + user.id + '","' + user.password + '")',
    user,
    (err, row) => {
      if (err) {
        if (err.message.includes("Duplicate entry")) {
          res.json({
            result: "fail",
            message: "id가 중복되었습니다.",
          });
          return;
        } else {
          res.json({
            result: "fail",
            message: "SQL 오류",
          });
          return;
        }
      }
      res.json({
        result: "success",
        message: "유저 추가 성공",
      });
      return;
    }
  );
});

module.exports = router;
