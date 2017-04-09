package app.dao;

import app.entity.TaskEntity;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;


public interface TaskDao extends AbstractDao<TaskEntity> {
}
