const express = require("express");
const router = express.Router();
const db = require("./db");

const connection = db.connection;

// 멘트 조회
router.get("/", function (req, res) {
  connection.query("SELECT * FROM virtualnum", function (err, rows) {
    if (err) throw err;
    res.send(rows);
  });
});

// 멘트 추가
router.post("/virtualinput", function (req, res) {
  const virtualnum = {
    vnumber: req.body.virtualnum.vnumber,
    userId: req.body.virtualnum.userId,
    path: req.body.virtualnum.path,
    useCheck: req.body.virtualnum.useCheck,
  };
  connection.query(
    'INSERT INTO virtualnum(vnumber, userid, path, usecheck) VALUES ("' +
      virtualnum.vnumber +
      '","' +
      virtualnum.userId +
      '","' +
      virtualnum.path +
      '","' +
      virtualnum.useCheck +
      '")',
    virtualnum,
    function (err, row) {
      if (err) {
        res.json({
          success: false,
          message: err.message,
        });
      }
      if (row.affectedRows == 1) {
        res.json({
          success: true,
          message: "추가 완료",
        });
      } else {
        res.json({
          success: false,
          message: "실패",
        });
      }
    }
  );
});

// 멘트 수정
router.post("/virtualupdate", function (req, res) {
  const virtualnum = {
    vtnum: req.body.virtualnum.vtNum,
    vnumber: req.body.virtualnum.vnumber,
    userId: req.body.virtualnum.userid,
    path: req.body.virtualnum.path,
    useCheck: req.body.virtualnum.usecheck,
  };
  connection.query(
    'UPDATE virtualnum SET vnumber = "' +
      virtualnum.vnumber +
      '", userid = "' +
      virtualnum.userId +
      '", path = "' +
      virtualnum.path +
      '", usecheck = "' +
      virtualnum.useCheck +
      '" WHERE vtnum = ' +
      virtualnum.vtnum,
    virtualnum,
    function (err, row) {
      if (err) throw err;
      if (row.affectedRows == 1) {
        res.json({
          success: true,
          message: "수정 완료",
        });
      } else {
        res.json({
          success: false,
          message: "실패",
        });
      }
    }
  );
});

// 멘트 삭제
router.post("/virtualdelete", function (req, res) {
  const virtualnum = {
    vtNum: req.body.virtualnum.vtNum,
  };
  connection.query(
    "DELETE FROM virtualnum where vtnum = " + virtualnum.vtNum,
    function (err, row) {
      if (err) throw err;
      if (row.affectedRows == 1) {
        res.json({
          success: true,
        });
      } else {
        res.json({
          success: false,
        });
      }
    }
  );
});

// 멘트 삭제(가상번호로)
router.post("/vnumdelete", function (req, res) {
  const vnumber = req.body.vnumber;
  connection.query(
    'DELETE FROM virtualnum where vnumber = "' + vnumber + '"',
    function (err, row) {
      if (err) throw err;
      if (row.affectedRows == 1) {
        res.json({
          success: true,
        });
      } else {
        res.json({
          success: false,
        });
      }
    }
  );
});

// 멘트 삭제(경로로)
router.post("/pathdelete", function (req, res) {
  const path = req.body.path;
  connection.query(
    'DELETE FROM virtualnum where path = "' + path + '"',
    function (err, row) {
      if (err) throw err;
      if (row.affectedRows == 1) {
        res.json({
          success: true,
        });
      } else {
        res.json({
          success: false,
        });
      }
    }
  );
});

module.exports = router;
