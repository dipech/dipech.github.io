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

## Latency and Throughput

These two terms are two of the most important measures of the performance of a system.

Latency stands for how long it takes data to traverse the system. For example, latency of a request means 
how long it takes a request to go from a client to a server and the back to the client.
There could be many things that can be measured in the term of latency. We should know about an order of magnitude.
For example, reading some data from memory can take hundreds of microseconds, but reading some data from HDD can take
tens of thousands of microseconds.

Latency is measured in time. For example: the request took 1 second.

Throughput stands for how much work a machine can perform in a given period (how much data can be transferred 
from one point of a system to another part of the system in a given amount of time).

Throughput is measured in operations per time unit. For example: the given server can handle 
2000 requests per second (2000 RPS).

You cannot make predictions about latency by measured throughput or about throughput by measured latency.
They aren't necessarily correlated.

## Availability

Availability means how resistant a system to failures. Multiple things can fail: servers, databases, other workers, etc.
We can measure availability as how much time as system is operational in percents.

When we talk about availability we use a term "Nines". If system is available 99% of all time then we says that
the system has two nines availability.

High Availability (HA) means 5+ nines. For instance lets calc unavailability in seconds per year for typical nines:
- 2 nines = 99% = ~90 hours per year.
- 3 nines = 99.9% = ~9 hours per year.
- 4 nines = 99.99% = ~1 hour per year.
- 5 nines = 99.999% = ~ 5 minutes per year.

**SLA** stands for Service Level Agreement (agreement between a service provider and end-users of this service).
It means that a service explicitly guarantees a level of availability (uptime for instance).

**SLO** stands for Service Level Objective (a part of SLA). SLA consists of SLO, and it's nothing other than a specific
numbers in SLA, for instance, numbers of error you might face using a service, or guaranteed uptime, etc.

Designing a system, you have to ask yourself what parts of the system are critical and should have HA.

## Redundancy

This is a technique of duplicating or even multiplication of some part of the system to increase reliability.
We can use Load Balancers to distribute the load between services. You also can have multiple load balancers.

Redundancy can be passive and active. Passive redundancy (or just redundancy) is about making multiple copies of 
a service and split traffic between them. Active redundancy is when these services also provide information about their
overload factors, so the load balancer can send traffic to less overloaded instances.

## Caching

Caching is used to speed up a system (in other words, to reduce latency of a system). Caching is a technique of storing 
data  in the location where we able to access it faster. We also can use caching to reduce reading the same data 
by multiple services.

Summarizing. Cache can be used:
- To avoid performing of multiple HTTP requests (especially for static content).
- To avoid calling computationally long operations multiple times.
- To prevent execution operations which are performed a huge amount of times.

Write-through cache – write data to cache and to DB at the same time.
Write-back cache - update only cache, and then, after some time or by an event, update DB.

## Proxies

**Forward Proxy** (or just Proxy) is a server that sits between a client (or a set of clients) 
and a server (or a set of clients). Forward proxies act on behalf of clients.

Forward Proxy Scheme:
`C` –> `FP` -> `S` –> `FP` –> `C`

Often used to mask the real IP address of a client.

**Reverse Proxy**, on the other hand, acts on behalf of a server. Clients think that they communicate with the server
but in reality they communicate with the RP (and see the RP IP address).

Reverse Proxy Scheme:
`C` –> `RP` -> `S` –> `RP` –> `C`

This scheme is similar to the scheme above but means different things.

Reverse Proxies much more useful in context of System Design. They can be used for:
- Filtering out unwanted requests (real servers won't deal with filtered).
- Logging requests, gathering metrics.
- Caching, especially for static HTML pages.
- Load balancing requests between a set of servers.

> Nginx can be used as a reverse proxy and load balancer.
 
## Load Balancer

Load balancer is a server that sits between a set of clients and a set of servers, and balancing requests 
from the clients to the servers in a balanced way.
DNS also can act like a load balancer by providing different IP addresses on the same request.

Hardware Load Balancers are literally dedicated machines. Their sole purpose is obvious. Software Load Balancers are 
just software, and they have much more options. 

Server-selection strategies:
- Randomly.
- Round-robin: send traffic by using some order, for instance, servers' numbers: 1, 2, 3, 4, 5, 1, 2, etc.
- Weighted round-robin: you still follow the order, but if one server has bigger weight that others then it gets 
more requests in total.
- Based on performance (on load): a load balancer performs a health-check requests on the servers to know how much 
traffic a server is handling in a given time, how long a server is taking to respond, how many resources are used. Based
on gathered information the load balancer solves which server will handle the following request.
- IP-based server-selection strategy: IP addresses of clients are being hashed to get a number of a server to map 
this client to. It can be useful if servers cache information, and it's important to show the same cached results 
to the same client.
- Path-based server-selection strategy: "/pay" requests go to one set of servers, "/download" requests go to another
set of servers, and so on and so forth.

Very important point is you can have multiple load balancers, moreover you can have multiple load balancers used 
different server-selection strategies.
 
## Hashing

Hashing is a process of transforming an arbitrary piece of data into a fixed size value, typically to a number.
Hashing, for instance, is used in IP-based server-selection strategy, when clients' IP addresses hashed into numbers, 
then mod operator applied to get indices of the servers to route to. One remark is we cannot use mod operator 
if we change numbers of servers, because we'll get clients routed to different servers 
(not to the same servers they have been routed before). This is where Consistent Hashing and Rendezvous Hashing 
come to play.

**Consistent Hashing** is a technique by which you place servers and clients on a range on numbers, for instance [0-360],
and client's request redirects to the closest server to "the right" (imagine circle with clients and servers on it).
A value from range calculates as `hash(IP) % rangeLength`. Each server can have multiple locations on the range 
(these servers are getting more traffic than others). This technique minimizes clients shifting to other servers 
in the case when we add new or remove existent servers.

**Rendezvous Hashing** is a technique by which you calculate a score value of each server for each client, 
client's request will go to a server with the highest score value. 

