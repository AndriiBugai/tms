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
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.concurrent.ExecutionException;

@CrossOrigin
@RestController
@Scope("session")
@RequestMapping("/user-service/")
@SessionAttributes(value = "userId")
public class UserManagementController {

    @Autowired
    UserDao userDao;

    @Autowired
    UserData userData;

    @RequestMapping(value = "/signIn/", method = RequestMethod.POST)
    public String signIn(@RequestParam("login") String login,
                         @RequestParam("password") String password) throws JsonProcessingException {
        try{

            PersonEntity personEntity =  userDao.findUserForSignIn(login, password);
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
    public String register(   @RequestParam("firstName") String firstName,
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
        user.setPassword(password);
        user.setDateCreated(new Date());
        PersonEntity personEntity = userDao.create(user);
//        userData.setUserId(personEntity.getId());
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(personEntity);
    }

    @RequestMapping(value = "/updateProfile", method = RequestMethod.POST)
    public String updateProfile(  @RequestParam("firstName") String firstName,
                                  @RequestParam("lastName") String lastName,
                                  @RequestParam("email") String email,
                                  @RequestParam("login") String login,
                                  @RequestParam("password") String password) throws JsonProcessingException {
        int currentUserId = userData.getUserId();
        PersonEntity user =  userDao.findById(currentUserId);
        user.setEmail(email);
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setLogin(login);
        user.setPassword(password);
        PersonEntity personEntity = userDao.update(user);
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(personEntity);
    }

    @RequestMapping(value = "/getCurrentUser", method = RequestMethod.GET)
    public String findUserByName() throws JsonProcessingException {
        try{
            int currentUserId = userData.getUserId();
            PersonEntity personEntity =  userDao.findById(currentUserId);
            ObjectMapper mapper = new ObjectMapper();
            return mapper.writeValueAsString(personEntity);
        } catch (Exception e) {
            logOut();
            return "no user";
        }
    }

}
