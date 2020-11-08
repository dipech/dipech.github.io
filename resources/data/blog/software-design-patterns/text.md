## MVC

To be done

--------------------

## Singleton

To be done

--------------------

## Template method

To be done

--------------------

## Abstract fabric

To be done

--------------------

## Builder

To be done

--------------------

## Active record

To be done

--------------------

## DI, DIP, IoC

**Inversion Of Control** - это принцип (паттерн), согласно которому **не разработчик управляет ходом выполнения кода**, используя при это внешние библиотеки, а **фреймворк управляет ходом выполнением кода**, предоставляя возможности **расширения** программисту в **нужных** местах.

Для этого нужно понимать разницу между **библиотекой** и **фреймворком** (см. прикрепленную карточку).

**Dependency Injection**– принцип, согласно которому зависимость нужно **не создавать внутри класса**, а **передавать** через *конструктор*/*метод*/*поле* класса.

Жизненно необходимые зависимости рекоммендуется передавать через конструктор, а опциональные через методя или поля.

**Dependency Inversion Principle** - принцип инверсии зависимостей, согласно которому передаваться как зависимости должны классы текущего уровня абстрации или выше, а классы ниже уровня абстракции передаваться не должны.

Что это значит: это значит, что, например, передавать в класс **NotificationSender** нужно классы с того же уровня абстракции или выше, например, подать как зависимость класс **Notification**, но абсолютно **не нужно** подавать как зависимость класс **StringBuilder** или **Curl** - их можно и нужно создать прямо внутри класса.

Не правильно:

```
public class NotificationSender {
	private Curl curl;
	public Notification(Curl curl) {
		this.curl = curl;
	}
	public void send(Notification notif, 
		             StringBuilder builder) {
		this.curl.post("https://url.com/azaza", 
                       buildMsg(notif, builder));
	}
}
```

Ошибка – Curl и StringBuilder ниже уровнем абстракции, но передаются как зависимости.

Правильно:

```
public class NotificationSender {
	public void send(Notification notif) {
		var curl = new Curl();
		curl.post("https://url.com/azaza", buildMsg(notif));
	}
	private String buildMsg(Notification notif) {
		var builder = new StringBuilder();
		...
		return builder.toString();
	}
}
```

--------------------

## Composite

To be done

--------------------

## Decorator

To be done

--------------------

## Facade

To be done

--------------------

## Adapter

To be done

--------------------

## Strategy

To be done

--------------------

## DAO

структурный паттерн, позволяющий **изолировать бизнес-слой от слоя хранения данных**, используя **абстрактное API**.

Обычно для каждой сущности (будь то User, Car или Order) делается своя реализация интерфейса **Dao** (UserDao, CarDao, OrderDao):

```
public interface Dao<T> {
    List<T> getAll();
    Optional<T> get(long id);
    void save(T t);
    void update(T t);
    void delete(T t);
}
```

--------------------

## DTO

**DTO** (Data Transfer Object) – один из шаблонов проектирования, используется для передачи данных между слоями приложения.
Обычно **DTO** передают в слой **view** из слоя **контроллера** или **сервиса**.

Особенности DTO:
- Не должен содержать какого-либо поведения.
- Не обязательно должен соответствовать 1-к-1 объекту или объектам, на основе которых он был создан.

