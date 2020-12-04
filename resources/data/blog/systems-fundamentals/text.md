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

## Relational Databases

We can distinguish databases by using the property "relation".

There are two types of databases in common:
- Relational / SQL-based databases.
- Non-relational / NoSQL databases.

Relational databases store data in a tabular-like structure, and we able to query the data using SQL, 
which stands for standardised query language.

SQL databases must use ACID transactions:
- `A`: atomicity – if a transaction consists of multiple suboperations, then these multiple operations 
must be considered as a single unit. If all the suboperations passed, then the transaction passed. 
If one of the suboperation failed, then the entire transaction failed.
- `C`: consistency – no one transaction can bring the data to a stale state. If one of the suboperation failed, 
then the changes in the data must be reverted to an original state.
- `I`: isolation - the changes after parallel transactions must be the same as if these transactions are executed 
sequentially.
- `D`: durability - any committed transactions is written to non-volatile storage. It cannot be undone by power loss 
or any other kind of crash.

Database index is a tool which allows you to find data in relational databases faster. 
For instance, if you have a column with numbers, and you have millions of rows, you'll find 
the largest value in the column in O(N) time. But, if you have an index upon the column, then you can find 
the largest value in the column in O(1) time.

It takes additional space and reduces the speed of writing data because you also need to update indices. 
But, it increases the speed of reading data.

## Non-relational databases

Non-relational database (NoSQL database) is a key-value store behaves like hash-table. 
KV stores often used for caching, storing configurations, etc.

Different realisations of key-value stores behave differently. Some key-value stores can guarantee strong consistency, 
while other can guarantee eventual consistency.

> Popular solutions might be: DynamoDB, Etcd, Redis, ZooKeeper

## Specialized Storage Paradigms

### Blob store

Blob is an arbitrary piece of unstructured data like an image file, a video file, some binary data, etc. 
Usually you access the data by the name of the blob. It's usually slower that Key-Value stores, but it can handle
huge pieces of data, even gigabytes.

> Google Cloud Storage, Amazon S3

### Time Series store

These databases optimized for storing and analyzing time-indexed data. Common use cases are monitoring and logging.

> InfluxDB, Prometheus, Graphite

### Graph store

Graph databases are built on top of graph data model. Data entries can have explicitly defined relationships.
These graph databases can perform operations on deeply connected data very fast. It's a preferred way of working with
data which has multiple levels of relations.

Cypher is a query language for graph databases.  

> Neo4j

### Spatial store

When we need to store spatial data like locations on a map (latitudes and longitudes).
Databases of this kind rely on spatial indices.

Quadtree is a tree data structure most commonly used to index two-dimensional spatial data.

## Replication and Sharding

Systems performance often depends on its databases' performance, because databases are critical to a system.

Replica is nothing more than just another database stands next to main database. Main database handles all the 
read/write operations and updates the replica according to it. If main database goes down, the replica takes over 
and now becomes the new main database. After fallen one is recovered, it will be updated from the replica, then they
will swap their roles again.

If you want to have the replica capable to replace the main while it's down, then you need to have the replica
be always absolutely the same as the main database. In this scenario we use synchronous updating mode.

You can update the replica asynchronously, but it can be unacceptable for many cases. 
You can have many replicas at the same time. If you have tons of data then you need to sync this data between
all the replicas. That can be unacceptable. This is where sharding coming to play.

Sharding is a technique of partitioning the data across multiple database servers. We split our main database into
a bunch of little databases. Shards is a data partitions. You can shard on different levels. You can store some tables
in one shard, other tables in another shard. Moreover, you can store specific rows of a table in different shards by 
custom logic. Or you can store the dat according to a region. Some piece of data is stored in a shard in North America, 
another piece of data is stored in a shard in Europe, and so on and so forth.

You can have this splitting logic in your application server, but it's better to have a reverse proxy, which is
working on behalf of shards, consists of splitting logic and redirects the data to a suitable shard. 
That reverse proxy can consist the splitting logic based on consistent hashing.   

## Leader Election

With the leader election, if you have a group of servers which are in charge of doing the same thing, instead of doing
the same thing which is not what you want to do multiple times (for instance: debit/credit operations), leader election
has the servers to select the leader who alone will do that action.
Other servers are doing nothing until the leader is fallen. If the leader goes down, then one of the rest services 
become a new leader.
The real difficulty is in distributed machines and their communication. To achieve leader election 
we can use Consensus Algorithms. This group of algorithms allow a group of nodes to reach consensus or to agree 
on some single data value. One of such algorithm is Paxos & Raft. These algorithms are immensely tough, and 
you don't need to implement it by yourself. You probably will use some third-party service that uses 
one of these algorithms under the hood.

Etcd/ZooKeeper are highly available and strongly consistent systems, Etcd implements Raft Consensus Algorithm 
for leader election.

To implement leader election we're going to have a key-value pair in Etcd where key 
is a fixed key like "who-is-the-leader", and the value could be an IP address of the leader machine. 

> ZooKeeper is a highly available key-value store. It's often used to store important configurations 
> or to perform leader election.

> Etcd also can be used for the same purposes.

## Peer-To-Peer networks

This technique can be useful for sharing huge amount of data between a large set of machines.

For example, we have to share one 5Gb file from one machine to one thousand of machines. 
The network throughput is 5Gbps. If we do it naively (by sharing to one by one machine), it will take a thousand seconds.

The main idea of peer-to-peer networks is splitting data into small pieces and sending them to target machines, then 
target machines talk to each other and gather missing pieces from other machines and share already downloaded pieces 
with other machines either.

How do peers know about each other? There are at least two main approaches:
- Centralised way (by using Tracker): we have a machine known as Tracker, that machine has all the information about pieces 
and their locations, and coordinates machines' downloading.
- Decentralised way (by using Gossip Protocol): we have no central machine, each peer communicates with other peers 
and shares an information it already has, like "peer 5th has 16th and 585th pieces, peer 9th has 2-4th pieces, ...".

Peer-To-Peer networks often operate having distributed hash table what peers contain what pieces of data.

> Further reading: Gossip (Epidemic) Protocol, Distributed Hash Table (DHT), Uber's Kraken P2P system.

## Polling and Streaming

By using polling, a client is issuing data from a server following a set interval. For example, client fetches data 
every X seconds. But polling has limitations streaming technique is free from. If you want to get data updates 
instantly then you probably need to use streaming. 

Streaming technique allows you to fetch regularly changing data regularly in effective manner, not by sending 
HTTP requests all the time, because it is too expensive for this kind of tasks. A client using streaming opens 
a long-lived connection with a server (typically it's done by using sockets).

A socket basically is a file on your computer you can write to and read from to communicate with another computer 
during a long-lived connection.

## Configuration

Configuration is a set of settings which configure an application behavior. It can be any type, but typically it's just
json or yaml files, or a set of key-value pairs.

So, configurations can be two types:
- Static.
- Dynamic.

### Static configurations

Configurations of this type are typically stored along with an application or bundled inside the application.
It often needs to reload an app or even rebuild and redeploy the app to apply changes.
It's safer, because we can detect mistakes during code review or testing, but you cannot instantly view the results of 
changes in the config. 

### Dynamic configurations

Configurations of this type are typically stored in some external store such as ZooKeeper, Etcd, Redis, etc...
You can instantly see the results right after changing the value of a setting, but the app may fail if you have no
prevalidation/premoderation before saving a value. You may also need some protection to restrict access 
for unauthorised users. In fact, you need to have an external store, and you need to create an additional application 
to CRUD and validate config values and control access by using ACL.

## Rate limiting

DOS stands for denial-of-service attack and means that some computer is trying to get your service down by sending
as many as possible requests at a time. We can use rate limiting to prevent DOS.

DDOS stands for distributed DOS. It's much harder to defend against this type of attacks.

Rate Limiting means we take control of how many actions (or requests) can be handled in a given amount of time by some
service. For example, we can limit POST "/login" requests up to 10 per minute. If we send 11th request to this endpoint
in less than 1 minute then we get an error in response. We can limit accessing particular endpoints, or we can limit 
access for users based on different user's parameters like IP address, region, permissions, and so on and so forth.

We can store data needed for rate limiting in memory. If we have redundancy then we need to use shared storage 
for this data. Redis, for example, which often used for this task.

We also can build more complex logic of rate limiting, for instance, tier-based rate limiting. 

This is some example of tier-based rate limiting:
- Tier 1: Max 3 operations per second
- Tier 2: Max 10 operations per 30 seconds
- Tier 3: Max 50 operations per minute

## Logging, Monitoring, Alerting

Logging is important, especially in large distributed systems. There are many prebuilt systems to manage logs.

Two the most popular logging formats:
- Syslog.
- Json.

How we can gather metrics:
- By parsing logs.
- By additional logging directly into Time-series DB.

In many systems we can configure alerts by given conditions. For example, send an alert if we have little space on disk, 
or if our requests process too long.

> Google Stackdriver, ELK, Graylog

## Publish/Subscribe pattern

Publishers are entities that send messages into Topics. Topics are channels where messages are stored until being 
consumed by Subscribers. Subscribers are entities that consume messages from Topics.
Publishers don't communicate with Subscribers directly, and vice versa is also true.
Messages just represent some form of data relevant for Subscribers. It might be text data or blobs or any type of 
structured data.

Systems implemented that pattern might (or event must) have the following characteristics:
- At-least-once delivery.
- Persistent storage.
- Messages ordering.
- Messages replayability.

It needs to keep in mind that "at-least-once" delivery means that each message can be received multiple times.
You probably might want to have your operations to be idempotent. But if your operations aren't idempotent it also 
can be ok. It relies on your requirements.

Idempotent operation is an operation you can perform one or multiple times and get the same result. So, the result 
isn't depended on how many times the operation has been performed.

> Apache Kafka, Google Cloud Pub/Sub

## MapReduce

MapReduce is a way to process immensely large datasets in a distributes setting effectively, quickly and 
in a fault-tolerant manner.

How does it work? In the beginning, we have our dataset spread across multiple machines. For example, we split out data 
into 100 pieces of data and put it into 100 machines.
The first step is named **Map**. During this step all chunks of data map into key-value pairs by applying defined 
**map function**.
The second step is named **Shuffle**. During this step key-value pairs are reorganized such that pair of the same key
are routed to the same machine in the final step.
The second step is named **Reduce**. During this step shuffled key-value pairs transform into meaningful data by 
applying defined **reduce function**.

The final chain looks like that:
Data -> Data chunks -> Sets of Key-Value pairs -> Shuffled sets -> Reduce sets -> Final result.

Important notes:
- Dealing with MapReduce, we're working with Distributed File System (DFS).
- Having in use some implementation of MapReduce, engineers need to take care only of "map" and "reduce" functions, 
input data and output results.
- Chunks are processed locally (where it resides). They don't move to any special place to be processed.
- Key-value pairs are important.
- To be a fault-tolerant system, MapReduce implementations re-perform failed operations. That means that map and reduce
functions should be idempotent.

A Distributed File System is an abstraction over a cluster of machines that allows them to act like 
one large file system. DFSs take care of replication and availability of data in a distributed setting.

> Hadoop is a framework that also supports MapReduce jobs.

## Security and HTTPS



## API design


