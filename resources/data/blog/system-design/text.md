## Common algorithm

**1. Gather requirements**

You may use the next section and pick questions to ask for.

**2. Define the API** 

It can be a list of actions you able to perform with the system, like: AddPost, GetPosts.
You also may want to define signatures for them like: AddPost(userId, postData), GetPosts(userId), GetFeed(userId).

**3. Design the system**

## Common questions to ask

**Do we need to design the entire system or some specific part of it?**

If so, design only what you asked for.

**Can you split the entire system into separate, distinguishable components?**

If so, design them separately.

**How often the content may change?**

You may think of caching the data by different caching techniques.

**Does the system have static content?**

If so, you may use Blob store for storing static content and CDNs to speed-up static content serving. 

**How much data can be in the system?**

If your system has a huge amount of data, then you can apply a sharding technique (carefully!).
You can have your database sharded by users, for instance. 
Or you may have the main data not sharded at all, but have sharded some post-processed data, optimized for some specific
case.

**What about security? Should we worried about it?**

If we aren't worrying about security at the moment, this makes things easier a little.

**How many users are going to use the system?**

For instance: 1M per a month, 10k simultaneously at specific point in time.

**What latency should be for the most critical operations?**

**What availability level should be presented?**

In other words, how many "nines" of availability you need to provide.

**How fast the system must be?**

If the system must be fast, then you may want to apply techniques to reduce latency.

**How large the system must be? Is it distributes across the world?**

If so, then you may want to apply DNS load balancing among world's regions.

**Is it an internal system?**

If so, then you probably don’t want to achieve super high-availability, 2-3 nones might be enough.

## Some recipes you may want to use

**Is the system has clusters for more than one world region?**

Use DNS load balancer to send users to their region.

You also may want to have these clusters synchronized. If so, you can use asynchronous data replication 
between data stores.

**Is the system consists of multiple services for different purposes?**

Use path-based load balancing, for instance:
* if path is like `/api/payment/**` then proxy pass the request to payment services load balancer.
* if path is like `/api/user/**` then proxy pass the request to user services load balancer.

**Are there any "in-memory" cache in any service for users?**

Use hash-based load balancing, to guarantee caches using.

**Does the system need to be super fast whist having a data fits into the memory entirely?**

You may use in-memory data structures and computations, which is very fast.
To guarantee availability you might need to have at least two servers, one is the leader, 
the rest servers are followers.

**Do you need to have some sort of realtime interactions?**

Use websocket connection.

**Do you need to have the system highly available?**

Consider using Leader Election principle. It means you have a group of servers the same kind, one of the is the leader
(server which performs actual work), the rest are untouched until the leader is failed.

**Do you need to deal with logs? Analyse it?**

Use distributed file-system (for instance, HDFS for Hadoop) and asynchronously process it with MapReduce.

Example:
We collect a huge amount of logs like that: 
`{userId: "uid1", articleId: "aid1", event: "READ", ...}` 
where event is ENUM {READ, LIKE, COMMENT}

We store logs in HDFS and then we apply MapReduce here.

Our Map function may map our data into something like that:
```
{
    "uid1": [("aid1", "READ"), ("aid1", "LIKE"), ("aid2", "COMMENT"), ...],
    "uid2": [("aid3", "READ"), ("aid4", "READ"), ...],
    ...
}
```

Then our Reduce function may use some kind of machine learning to rank articles by users actions 
to build something like that:
```
{
    "uid1": {
        "aid1": 1,
        "aid2": 0.85,
        ...
    },
    "uid2": {
        "aid3": 1,
        "aid4": 0.25,
        ...
    },
    ...
}
```

## What to do

**After building a part of the system or the entire system**

1) Determine what services do lots of jobs and consider splitting them into distinct services.
  
2) Try going step-by-step through entire system and imagine what happens if something goes wrong:
* Packet loss / Network connection troubles.
* Servers failure.
* Etc.

## Stuff to think of by related topics

**SQL Databases:**
- ACID and transactions.
- Column indices.

**Services scaling:**
- Master-service for controlling them all.
- Health-checks for each slave.

## Technologies you may use

**Blob storages:**
- Amazon S3.
- Google Cloud Storage.

**Key-Value storages:**
- Etcd.
- ZooKeeper.

**Messaging systems:**
- Google Pub/Sub.
- Kafka.
- RabbitMQ.







