## 1. What is Spring Boot?

Spring Boot is a framework that helps programmers to create Spring applications.

Benefits of using Spring Boot:
- It makes spring's dependencies management easier by using "starter" dependencies.
These dependencies (like `spring-boot-starter-data-jpa`, `spring-boot-starter-web`, etc) contain 
classes with auto-configurations which implicitly configure your application to start with an optimal app configuration.
- By using autoconfiguration, Spring automatically registers all necessary beans into your application 
and makes further configuration easier (for instance, if you have `spring-boot-starter-jdbc` then you have 
`DataSource`, `EntityManagerFactory`, `TransactionManager` beans already injected. You just need to specify connection 
data in `application.properties` file).
- It contains an embedded web server, so you don't have to set up an application server.

--------------------

## 2. What can we use for configuring Spring Boot application?

- Set some properties inside **application.properties**.
- By using `@EnableAutoConfiguration` annotation we can exclude some autoconfigurations like this: `@EnableAutoConfiguration(exclude={DataSourceAutoConfiguration.class})`;
- By defining configuration classes with `@Configuration` annotation.
- By defining beans using `@Bean` annotation.

--------------------

## 3. How does Spring Security work?

There're some main classes:

- `SecurityContextHolder` is a helper class which provides `SecurityContext`. It stores the data in a ThreadLocal by default.
- `SecurityContext` is used to store the details of the currently authenticated user. It contains `Authentication`.
- `Authentication` represents the token for an authentication request.
- `GrantedAuthority` is a permission that can be given to a user (like DELETE_ACCOUNT, CREATE_USER). 
There're also roles, which are just authorities with the prefix `ROLE_`, like ROLE_ANONYMOUS, ROLE_USER, ROLE_ADMIN.
- `UserDetails` provides core user information.
- `UserDetailsService` searches user by username and returns fully configured `UserDetails` object.

An authentication process looks like that:
- User inputs his username and password. These are combined into `UsernamePasswordAuthenticationToken` and passed 
to `AuthenticationManager` for verification.
- If the verification fails then `BadCredentialsException` will be thrown.
- Otherwise, `Authentication` will be composed and set into `SecurityContext`.

--------------------

## 4. Which annotations does Spring use for registering classes in Spring Context?

- `@Component`
- `@Service`
- `@Repository`
- `@Controller`
- `@Bean` inside a class with `@Configuration`

--------------------

## 5. Differences between `@Controller` and `@RestController`.

`@RestController` == `@Controller` + `@ResponseBody`.

`@ResponseBody` is an annotation used to specify that the endpoint returns an object in some text
representation (json, for instance). If you want to get JSON, you probably would use 
`MappingJacksonHttpMessageConverter` to achieve that.

--------------------

## 6. IO/NIO Streams

To be done.

--------------------

## 7. How does Spring Context work?

`ApplicationContext` is an interface which has several implementations. `ClassPathXmlApplicationContext` is one of them.
Beans, after being scanned (by looking for XML, Java or Annotation configs), are put into internal beans map. 
If you need some bean, and the bean is presented  in AppContext, then you able to get the bean from it by using class or keyword. 
Typically, it's done by using Dependency Injection. 
Just declare a bean as an input parameter for the constructor and Spring will automatically inject it.

--------------------

## 8. Java EE and Spring.

Java EE is a set of specifications determines fully-featured enterprise application framework.

There are concrete realisations of these specifications, such as JBoss, Glassfish, Weblogic.

Although Spring has many modules implement some Java EE specifications, some modules don't.
So, we cannot consider Spring as a Java EE implementation.
