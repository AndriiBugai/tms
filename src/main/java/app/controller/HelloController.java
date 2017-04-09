package app.controller;

import app.dao.BoardDao;
import app.dao.TaskDao;
import app.entity.BoardEntity;
import app.entity.TaskEntity;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@RestController
@RequestMapping("/service/")
public class HelloController {

    @Autowired
    TaskDao taskDao;

    @Autowired
    BoardDao boardDao;
    
    @RequestMapping("/getAllTasks")
    public String index() throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        List<TaskEntity> entityList = taskDao.findAll();
        return mapper.writeValueAsString(entityList);
    }

    @RequestMapping("/getAllBoards")
    public String getAllBoards() throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        List<BoardEntity> entityList = boardDao.findAll();
        return mapper.writeValueAsString(entityList);
    }
    
}
