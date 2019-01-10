const http=require("http")
const io=require("socket.io")


let httpServer=http.createServer((req,res)=>{

})
httpServer.listen(8080)

let wsServer=io.listen(httpServer)

let aSock=[];   //存放客户端的信息
wsServer.on("connection",sock=>{
    aSock.push(sock)      //每当有人连接服务器，就把客户端信息存进数组

    sock.on("disconnect",()=>{     //当连接断开的时候将该客户端信息删除
        let n=aSock.indexOf(sock)   //找的sock的位置

        if(n!==-1){
            aSock.splice(n,1);     //删除sock的信息
        }
    })

    sock.on("msg",(str)=>{
        aSock.forEach(s=>{
            if(s!=sock){
                s.emit("msg",str);
            }
        })
    })
})
