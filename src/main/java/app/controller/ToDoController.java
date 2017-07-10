package app.controller;

import app.dao.BoardDao;
import app.dao.TaskDao;
import app.dao.UserDao;
import app.entity.BoardEntity;
import app.entity.PersonEntity;
import app.entity.TaskEntity;
import app.entity.UserData;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpSession;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/service/")
public class ToDoController {

    @Autowired
    TaskDao taskDao;

    @Autowired
    BoardDao boardDao;

    @Autowired
    UserDao userDao;

    @Autowired
    UserData userData;
    
    @RequestMapping("/getAllTasks")
    public String getAllTasks() throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        List<TaskEntity> entityList = taskDao.findAll();
        return mapper.writeValueAsString(entityList);
    }

    @RequestMapping(value = "/createTask/", method = RequestMethod.POST)
    public void createTask(@RequestParam("name") String name,
                           @RequestParam("boardId") int boardId) throws JsonProcessingException {

        BoardEntity board = boardDao.findById(boardId);
        PersonEntity person = userDao.findById(1);

        TaskEntity task = new TaskEntity();
        task.setName(name);
        task.setDescription("");
        task.setTopPriority(false);
        task.setBoard(board);
        task.setCreatorPerson(person);
        task.setAssigneePerson(person);
        task.setDateCreated(new Timestamp(System.currentTimeMillis()));
        TaskEntity persistedTask = taskDao.create(task);
    }

    @RequestMapping(value = "/createBoard", method = RequestMethod.POST)
    public void createBoard(@RequestParam("name") String name) throws JsonProcessingException {
        String login = SecurityContextHolder.getContext().getAuthentication().getName();
        PersonEntity person = userDao.findUserByLogin(login);

        BoardEntity board = new BoardEntity();
        board.setName(name);
        board.setDescription("");
        board.setCreatorPerson(person);
        board.setDateCreated(new Timestamp(System.currentTimeMillis()));
        BoardEntity persistedBoard = boardDao.create(board);
    }

    @RequestMapping("/getTasksByBoard/{boardId}")
    public String getTasksByBoard(@PathVariable String boardId) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        List<TaskEntity> entityList = taskDao.findAllByBoard(Integer.valueOf(boardId));
        return mapper.writeValueAsString(entityList);
    }

    @RequestMapping("/deleteTasksById/{taskId}")
    public void deleteTasksById(@PathVariable String taskId) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        TaskEntity task = taskDao.findById(Integer.valueOf(taskId));
        taskDao.delete(task);
    }

    @RequestMapping("/deleteBoardById/{boardId}")
    public void deleteBoardById(@PathVariable String boardId) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        BoardEntity board = boardDao.findById(Integer.valueOf(boardId));
        boardDao.delete(board);
    }

    @RequestMapping(value = "/getAllBoards", method = RequestMethod.POST)
    public String getAllBoards() throws JsonProcessingException {
        String login = SecurityContextHolder.getContext().getAuthentication().getName();
        List<BoardEntity> entityList = boardDao.findByUserName(login);
        ObjectMapper mapper = new ObjectMapper();
        SecurityContextHolder.getContext().getAuthentication();
        return mapper.writeValueAsString(entityList);
    }

    @RequestMapping("/getBoardById/{boardId}")
    public String getBoardById(@PathVariable String boardId) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        BoardEntity boardEntity = boardDao.findById(Integer.valueOf(boardId));
        return mapper.writeValueAsString(boardEntity);
    }


}
