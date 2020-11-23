# What are Design Fundamentals?

Design Fundamentals consists of four very important intertwined categories:
- **Foundational knowledge:** There're gonna be things like Client-Server model, network protocols, etc.
- **Key characteristics of any system**: There're gonna be things like durability, availability, scalability, 
thoughput, redundancy, consistency.
- **Actual components of a system:** Things like load-balancers, proxies, caches, and so on and so forth.
- **Actual tech existing products you can use:** Things like Nginx, Kybernetes, Reddits, Zookeeper, Amazon S3, 
Google cloud storage.

## Client-Server model

**Client** is a machine or process that retrieves data from _Server_ by requesting it. 
**Server** is a machine or process that listens for requests, handles these requests and returns some data back.
Each machine or process can be a client, and a server at the same time. For instance: some website's backend returns
data to clients (it's a server's behaviour), at the same time it fetches some data from some relational database 
(it's a client's behaviour).
So, combining these terms together: **Client-Server model** is the paradigm by which systems are designed, and which 
consists of clients and servers, clients retrieve data from servers, servers provide data to clients.

When you're opening a website, your browser (a client) determines an IP address behind a domain name by requesting 
a DNS (Domain Name System), which consumes a domain name and produces an IP address. Then your browser sends a request
directly to a server behind determined IP. Each network protocol has a default port. 80 is for HTTP, 443 is for HTTPS,
22 is for SSH, and so on and so forth. If we're requesting a domain https://site.com, your browser sends a request 
to an IP, for example, 170.150.200.23, to 443-th port. If the server is listening for this port, and able to handle the 
request then the server, after some processing, returns needed data.

This is how the Internet works!

## Network protocols

At first, what a protocol is? A protocol is a set of rules for an interaction between two parties. 
Network protocols are using by machines (servers, clients) for communication with each other.
There're many network protocols, but main for us are:
- IP.
- TCP.
- HTTP.

**IP**

IP = Internet Protocol. The whole Internet built upon IP.

IP Packet is a small amount of information that being sent over network. It's made of bytes and consists of
two main parts: a header and the data. A header contains a lot of useful information such as the IP address of a source
machine, the destination IP address, the total size of the packet, the version of a protocol (v4 or v6). 
IP packets is 2^16 bytes. This isn't enough to fix an average size image. So, how do we send cats images and videos 
through the Internet? TCP is a solution of this problem.

[ IP_HEADER | PAYLOAD ]

**TCP**

TCP = Transmission Control Protocol. This protocol built on top of IP.

TCP splits the data into pieces, sends these pieces by using TCP packets, manages delivery and ordering.

TCP cuts a little part of the data part of a IP packet to store TCP header:

[ IP_HEADER | [TCP_HEADER | PAYLOAD] ]

TCP header contains at least an index of the data piece.

**HTTP**

HTTP = Hyper Text Transfer Protocol. This protocol built on top of TCP.
Clients make HTTP requests and get HTTP responses from servers.

A HTTP request has lots of useful fields such as host, port, method, headers, body.
A HTTP response has status code has fields such as status code, headers, body.
HTTP simplifies interaction between clients and servers by providing lots of 
useful possibilities to built business logic on top of that.
