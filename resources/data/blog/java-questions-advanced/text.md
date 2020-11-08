## 1. What is Spring Boot?

**Spring Boot** – это фреймворк, упрощающий создания приложений на основе Spring.
Далее рассмотрены плюсы использования **Spring Boot**.

- Упрощает управление зависимостями: Spring Boot **неявно** упаковывает необходимые сторонние зависимости для каждого типа приложения на основе Spring и предоставляет их посредством так называемых **starter-пакетов** (*spring-boot-starter-web*, *spring-boot-starter-data-jpa* и т.д.)

Например, если вы хотите начать использовать **Spring Data JPA** для доступа к базе данных, просто включите в свой проект зависимость **spring-boot-starter-data-jpa**. Если вы хотите создать **Spring web-приложение**, просто добавьте зависимость **spring-boot-starter-web**.

Spring Boot собирает все общие зависимости и определяет их в одном месте, что позволяет разработчикам просто использовать их, вместо того, чтобы изобретать колесо каждый раз, когда они создают новое приложение.
Кроме того, Spring Boot позволяет **уменьшить размер POM-файла**, т.к. зависимости сокрыты в стартер паках.

- Автоматическая конфигурация приложения: Spring Boot позволяет **автоматически конфигурировать приложение** – **подключает важные бины**. Например, если вы добавите **spring-boot-starter-web**, Spring Boot автоматически сконфигурирует такие зарегистрированные бины, как **DispatcherServlet, ResourceHandlers, MessageSource**.
Если вы используете **spring-boot-starter-jdbc**, Spring Boot автоматически регистрирует бины **DataSource, EntityManagerFactory, TransactionManager** и считывает информацию для подключения к базе данных из файла **application.properties**.

- Встроенный Web-сервер:  Каждое Spring Boot web-приложение включает встроенный web-сервер.
Разработчикам теперь не надо беспокоиться о настройке контейнера сервлетов и развертывании приложения на нем. Теперь приложение может запускаться само, как исполняемый jar-файл с использованием встроенного сервера.
Boot поддерживает новую аннотацию **@SpringBootApplication**, которая эквивалентна использованию **@Configuration**, **@EnableAutoConfiguration** и **@ComponentScan** с их атрибутами по умолчанию.
Таким образом, вам просто нужно создать класс, аннотированный с помощью **@SpringBootApplication**, а Spring Boot включит автоматическую настройку и отсканирует ваши ресурсы в текущем пакете.

--------------------

## 2. What can we use for configuring Spring Boot application?

- Set some properties inside **application.properties**.
- By using `@EnableAutoConfiguration` annotation we can exclude some autoconfigurations like this: `@EnableAutoConfiguration(exclude={DataSourceAutoConfiguration.class})`;
- By defining configuration classes with `@Configuration` annotation.
- By defining beans using `@Bean` annotation.

--------------------

## 3. How does Spring Security work?

Ключевые объекты контекста Spring Security:

- SecurityContextHolder, в нем содержится информация о текущем контексте безопасности приложения, который включает в себя подробную информацию о пользователе(Principal) работающем в настоящее время с приложением. По умолчанию SecurityContextHolder используетThreadLocal для хранения такой информации, что означает, что контекст безопасности всегда доступен для методов исполняющихся в том же самом потоке. Для того что бы изменить стратегию хранения этой информации можно воспользоваться статическим методом класса SecurityContextHolder.setStrategyName(String strategy). Более подробно SecurityContextHolder
- SecurityContext, содержит объект Authentication и в случае необходимости информацию системы безопасности, связанную с запросом от пользователя.
- Authentication представляет пользователя (Principal) с точки зрения Spring Security.
- GrantedAuthority отражает разрешения выданные пользователю в масштабе всего приложения, такие разрешения (как правило называются «роли»), например ROLE_ANONYMOUS, ROLE_USER, ROLE_ADMIN.
- UserDetails предоставляет необходимую информацию для построения объекта Authentication из DAO объектов приложения или других источников данных системы безопасности. Объект UserDetailsсодержит имя пользователя, пароль, флаги: isAccountNonExpired, isAccountNonLocked, isCredentialsNonExpired, isEnabled и Collection — прав (ролей) пользователя.
- UserDetailsService, используется чтобы создать UserDetails объект путем реализации единственного метода этого интерфейса

```java
UserDetails loadUserByUsername(String username) throws UsernameNotFoundException; 
```

Позволяет получить из источника данных объект пользователя и сформировать из него объект UserDetails который будет использоваться контекстом Spring Security.

Аутентификация:

1. Пользователю будет предложено войти в систему предоставив имя (логин или email) и пароль. Имя пользователя и пароль объединяются в экземпляр класса UsernamePasswordAuthenticationToken(экземпляр интерфейса Authentication) после чего он передается экземпляру AuthenticationManager для проверки.
2. В случае если пароль не соответствует имени пользователя будет выброшено исключение BadCredentialsException с сообщением “Bad Credentials”.
3. Если аутентификация прошла успешно возвращает полностью заполненный экземпляр Authentication.
4. Для пользователя устанавливается контекст безопасности путем вызова метода SecurityContextHolder.getContext().setAuthentication(…), куда передается объект который вернул AuthenticationManager.

--------------------

## 4. Which annotations does Spring use to register classes in Spring Context?

- `@Component`
- `@Service`
- `@Repository`
- `@Controller`
- `@Bean` inside a class with `@Configuration`

--------------------

## 5. Differences between `@Controller` and `@RestController`.

`@RestController` == `@Controller` + `@ResponseBody`.

--------------------

Аннотация `@ResponseBody` используется для того, чтобы сделать возвращаемый объект (напр. `Order` или `UserTo`) **содержимым тела ответа**, который `MappingJacksonHttpMessageConverter` вернёт в формате **JSON**.

## 6. IO/NIO Streams

To be done.

--------------------

## 7. How does Spring Context work?

ApplicationContext - это интерфейс в пакете org.springframework.context, он имеет несколько реализаций, и ClassPathXmlApplicationContext является одним из них.
Бины сканируются (указаны в XML, Java конфиге или аннотации+указан сканер аннотаций). Попадают во внутреннюю мапу объектов.
Если нужен бин - его можно достать из контекста спринга (по классу или ключевому слову).
При этом спринг бин заинжектит все нужные зависимости сами выдаст готовый бин.

--------------------

## 8. Java EE and Spring.

**Java EE** – это набор **спецификаций**, который в совокупности определяет **полнофункциональный Enterprise Application Framework**.

Т.к. **Java EE** – это набор **спецификаций**, то есть **конкретные реализации** данного набора спецификаций, например: JBoss, Glassfish, Weblogic.

**Spring** – это фреймворк, у которого много модулей, некоторые из которых соответствуют спецификациям **Java EE**, но большинство всё же нет.
