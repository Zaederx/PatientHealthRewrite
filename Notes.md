# Notes
Usally things that I learn or find helpful that might be useful in the future.

## Using @Query for more control over DB query's https://www.petrikainulainen.net/programming/spring-framework/spring-data-jpa-tutorial-introduction-to-query-methods/  

## Spring JPA Query Methods - https://www.ronaldjamesgroup.com/blog/spring-data-jpa-query-methods-by-bruno-drugowick

## Logging in Spring - https://docs.spring.io/spring-boot/docs/2.1.7.RELEASE/reference/html/boot-features-logging.html

## By directional relationships in hibernate require the mappedBy key word - otherwise you will have constraint violations each time you try to delete an object referenced by another column

## SECTION TESTING - some good libraries / dependencies for mocking

import org.hamcrest.Matchers;
import org.junit.Assert;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.CoreMatchers.not;
import static org.hamcrest.CoreMatchers.equalTo;

## Credentials are removed after successful authentication by default
This means that if you try to find the credentials in the authentication object i.e.
```
Authentication auth = SecurityContextHolder.getContext().getAuthentication();
String userPassword = "";
if (auth != null) {
    logger.debug("authentication not null");
    //here the credentials will be null if the user is already authenticated.
    userPassword = auth.getCredentials().toString();
    logger.debug("userPassword:"+userPassword);
}
```

## Passwords cannot be retrieved unless you write some custom Spring classes (a way of protecting passwords)
If you try 
```
String password = user.getPassword()// will not work because it is protected.
```