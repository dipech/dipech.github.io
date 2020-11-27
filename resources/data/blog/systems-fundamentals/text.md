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

