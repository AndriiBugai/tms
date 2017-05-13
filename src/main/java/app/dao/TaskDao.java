package app.dao;

import app.entity.TaskEntity;

import java.util.List;


public interface TaskDao extends AbstractDao<TaskEntity> {
    public List<TaskEntity> findAllByBoard(int boardId);
}
