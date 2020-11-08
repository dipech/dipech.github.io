## 1. EntityManager entities states and their possible transitions.

To be done.

--------------------

## 2. Which exceptions rollback a transaction?

Spring **автоматически откатывает** транзакции для **unchecked** исключений (*RuntimeXXX*).
Это поведение **по-умолчанию**.
Но **можно настроить** при помощи атрибута **rollBackFor** аннотации `@Transactional`.

--------------------

## 3. How can we achieve eager loading?

- By fetching manually.
- Using EntityGraph.
- Using Fetch (it uses "join" under the hood).

--------------------

## 4. How can we describe OneToOne, OneToMany, ManyToOne, ManyToMany relations between entities?

**One to one**

```
@Entity
public class Customer {
    @OneToOne
    @JoinColumn(name = “fk_shippingaddress”)
    private ShippingAddress shippingAddress;
}
```

**One to many** and **Many to one**

```
@Entity
public class Employee {
    @ManyToOne
    @JoinColumn(name="department_fk")
    private Department depratment;
}

@Entity
public class Department {
    @OneToMany(mappedBy="department")
    private Set<Employee> employees;
}
```

**Many to many**

To be done.

--------------------

## 5. Transaction isolation levels.

- **Read Uncommitted (0):** Чтение незафиксированных изменений. Нет гарантий, что прочитанные данные не будут откачены.
- **Read Commited (1):** Чтение зафиксированных изменений. Нет гарантий, что прочитанные данные не будут откачены.
- **Repeatable Read (2):** Повторяемое чтение. Чтение всех изменений своей транзакции, любые изменения, внесённые параллельными транзакциями после начала своей, недоступны.
- **Serializable (3):** Сериализуемый. Результат параллельного выполнения сериализуемой транзакции с другими транзакциями должен быть логически эквивалентен результату их какого-либо последовательного выполнения. Проблемы синхронизации не возникают.

--------------------

## 6. How does `@Transactional` annotation work?

To be done.

--------------------

## 7. Differences between `em.persist` and `em.merge`.

persist: Использует присланный **entity**, и любые изменения после **em.persist** будут учтены в транзакции.

merge: Делает копию присланного **entity**, по-этому изменения в **entity** после **em.merge** не будут учитываться в транзакции.
 
