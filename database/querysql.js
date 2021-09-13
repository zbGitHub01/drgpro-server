var UserSQL = {
    query: "select * From users where username = ? And password = ? ",
    queryInfo: "select * from roletable ",
    queryDiagName: " select * from roletable where diag_name = ? ",
    queryByPid: "select * from roletable where pid =? ",
    queryBySurgName: " select * from roletable where surg_name = ?",
    updateByParam: " update roletable set diag_name = ? ,surg_name = ? Where pid = ?"
}

module.exports = UserSQL