## Common algorithm

* **Gather requirements:** You may use the next section and pick questions from there.

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







