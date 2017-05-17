package app.controller;

import app.dao.BoardDao;
import app.dao.TaskDao;
import app.dao.UserDao;
import app.entity.BoardEntity;
import app.entity.PersonEntity;
import app.entity.TaskEntity;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

@CrossOrigin
@RestController
@Scope("session")
@SessionAttributes(value = "userId")
@RequestMapping("/service/")
public class ToDoController {

    @Autowired
    TaskDao taskDao;

    @Autowired
    BoardDao boardDao;

    @Autowired
    UserDao userDao;
    
    @RequestMapping("/getAllTasks")
    public String getAllTasks() throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        List<TaskEntity> entityList = taskDao.findAll();
        return mapper.writeValueAsString(entityList);
    }

    @RequestMapping(value = "/createTask/", method = RequestMethod.POST)
    public void createTask(@RequestParam("name") String name,
                           @RequestParam("description") String description,
                           @RequestParam("topPriority") boolean topPriority,
                           @RequestParam("boardId") int boardId) throws JsonProcessingException {

        BoardEntity board = boardDao.findById(boardId);
        PersonEntity person = userDao.findById(1);


        TaskEntity task = new TaskEntity();
        task.setName(name);
        task.setDescription(description);
        task.setTopPriority(topPriority);
        task.setBoard(board);
        task.setCreatorPerson(person);
        task.setAssigneePerson(person);
        task.setDateCreated(new Timestamp(System.currentTimeMillis()));
        TaskEntity persistedTask = taskDao.create(task);
    }

    @RequestMapping(value = "/createBoard/", method = RequestMethod.POST)
    public void createBoard(@RequestParam("name") String name, HttpServletRequest request) throws JsonProcessingException {
        int userId = (int) request.getSession().getAttribute("userId");
        PersonEntity person = userDao.findById(userId);

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




    @RequestMapping("/getAllBoards")
    public String getAllBoards(HttpServletRequest request) throws JsonProcessingException {
        int userId = (int) request.getSession().getAttribute("userId");
        ObjectMapper mapper = new ObjectMapper();
        List<BoardEntity> entityList = boardDao.findByUserId(userId);
        return mapper.writeValueAsString(entityList);
    }

    @RequestMapping("/getBoardById/{boardId}")
    public String getBoardById(@PathVariable String boardId) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        BoardEntity boardEntity = boardDao.findById(Integer.valueOf(boardId));
        return mapper.writeValueAsString(boardEntity);
    }

    @RequestMapping("/start")
    public String startHtml(){
        return "/templates/greeting.html";
    }



}
