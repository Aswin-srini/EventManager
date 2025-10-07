
exports.formate=(dates,date)=>{
        const dt = dates
        const Dateandtime = new Date(dt);
        return date.format(Dateandtime, 'YYYY-MM-DD HH:mm:ss')
    }

exports.Pagination = (page,limit)=>{
    const pageNo = page || 1;
    const pageLimit = limit || 5; 

    return skip = (pageNo - 1) * pageLimit
}
