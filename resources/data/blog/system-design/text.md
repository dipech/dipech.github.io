## Common algorithm

* **Gather requirements:** You may use the next section and pick questions from there.

## Common questions to ask

**Can you split the entire system into separate, distinguishable components?**

If so, design them separately.

**How much data can be in the system?**

**How many users will be using the system?**

**What availability level should be presented?**

In other words, how many "nines" of availability you need to provide.

**How fast the system must be?**

**How large the system must be? Is it distributes across the world?**

**Is it an internal system?**

If so, then you probably don’t want to achieve super high-availability, 2-3 nones might be enough.

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







