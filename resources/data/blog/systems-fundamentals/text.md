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

   