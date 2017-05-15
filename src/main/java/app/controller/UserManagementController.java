package app.controller;

import app.dao.UserDao;
import app.entity.BoardEntity;
import app.entity.PersonEntity;
import app.entity.TaskEntity;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Persistable;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.List;
import java.util.concurrent.ExecutionException;

@CrossOrigin
@RestController
@RequestMapping("/user-service/")
public class UserManagementController {

    @Autowired
    UserDao userDao;

    @RequestMapping(value = "/signIn/", method = RequestMethod.POST)
    public String signIn(@RequestParam("login") String login,
                       @RequestParam("password") String password) throws JsonProcessingException {
        try{
            ObjectMapper mapper = new ObjectMapper();
            PersonEntity personEntity =  userDao.findUserForSignIn(login, password);
            return mapper.writeValueAsString(personEntity);
        } catch (Exception e) {
            return "no user";
        }

    }

    @RequestMapping(value = "/register/", method = RequestMethod.POST)
    public void register(   @RequestParam("firstName") String firstName,
                            @RequestParam("lastName") String lastName,
                            @RequestParam("email") String email,
                            @RequestParam("login") String login,
                            @RequestParam("password") String password) throws JsonProcessingException {
        PersonEntity user = new PersonEntity();
        user.setDateCreated(new Timestamp(System.currentTimeMillis()));
        user.setEmail(email);
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setPassword(password);
        userDao.create(user);
    }

}
