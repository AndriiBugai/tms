package app.controller;

import app.dao.UserDao;
import app.entity.BoardEntity;
import app.entity.PersonEntity;
import app.entity.TaskEntity;
import app.entity.UserData;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.data.domain.Persistable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.context.SecurityContextHolder;


import javax.servlet.http.HttpSession;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@CrossOrigin
@RequestMapping("/user-service/")
public class UserManagementController {

    @Autowired
    UserDao userDao;

    @Autowired
    UserData userData;

    @RequestMapping(value = "/signIn/", method = RequestMethod.POST)
    public String signIn(HttpSession session,
                         @RequestParam("login") String login,
                         @RequestParam("password") String password) throws JsonProcessingException {
        try{

            PersonEntity personEntity =  userDao.findUserByLogin(login);
            userData.setUserId(personEntity.getId());
            ObjectMapper mapper = new ObjectMapper();
            return mapper.writeValueAsString(personEntity);
        } catch (Exception e) {
            logOut();
            return "no user";
        }
    }

    @RequestMapping("/logOut/")
    public void logOut()  {
        userData.invalidate();
    }

    @RequestMapping(value = "/register/", method = RequestMethod.POST)
    public String register( @RequestParam("firstName") String firstName,
                            @RequestParam("lastName") String lastName,
                            @RequestParam("email") String email,
                            @RequestParam("login") String login,
                            @RequestParam("password") String password) throws JsonProcessingException {
        PersonEntity user = new PersonEntity();
        user.setDateCreated(new Timestamp(System.currentTimeMillis()));
        user.setEmail(email);
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setLogin(login);
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String hashedPassword = passwordEncoder.encode(password);
        user.setPassword(hashedPassword);
        user.setDateCreated(new Date());
        PersonEntity personEntity = userDao.create(user);
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(personEntity);
    }

    @RequestMapping(value = "/updateProfile", method = RequestMethod.POST)
    public String updateProfile(  @RequestParam("firstName") String firstName,
                                  @RequestParam("lastName") String lastName,
                                  @RequestParam("email") String email,
                                  @RequestParam("login") String login,
                                  @RequestParam("password") String password,
                                  @RequestParam("passwordRepeat") String passwordRepeat,
                                  @RequestParam("userId") String currentUserId) throws JsonProcessingException {
        String currentUserLogin = SecurityContextHolder.getContext().getAuthentication().getName();
        PersonEntity user =  userDao.findUserByLogin(currentUserLogin);
        user.setEmail(email);
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setLogin(login);
        if(!password.equals(passwordRepeat)) {
            throw new IllegalStateException("passwords are different");
        }
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String hashedPassword = passwordEncoder.encode(password);
        user.setPassword(hashedPassword);
        PersonEntity personEntity = userDao.update(user);
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(personEntity);
    }

    @RequestMapping(value = "/getCurrentUser", method = RequestMethod.POST)
    public String findUserByName() throws JsonProcessingException {
        try{
            String currentUserLogin = SecurityContextHolder.getContext().getAuthentication().getName();
            PersonEntity personEntity =  userDao.findUserByLogin(currentUserLogin);
            ObjectMapper mapper = new ObjectMapper();
            return mapper.writeValueAsString(personEntity);
        } catch (Exception e) {
            logOut();
            return "no user";
        }
    }

}
