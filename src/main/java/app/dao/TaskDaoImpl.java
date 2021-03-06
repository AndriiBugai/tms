package app.dao;

import app.entity.TaskEntity;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.List;

@Repository
@Transactional
public class TaskDaoImpl implements TaskDao {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<TaskEntity> findAll() {
        return entityManager.createQuery("from TaskEntity").getResultList();
    }

    @Override
    public TaskEntity findById(int id) {
        return entityManager.find(TaskEntity.class, id);
    }

    @Override
    public TaskEntity update(TaskEntity entity) {
        entityManager.merge(entity);
        return entity;
    }

    @Override
    public void delete(TaskEntity entity) {
        if (entityManager.contains(entity)) {
            entityManager.remove(entity);
        }
    }

    @Override
    public TaskEntity create(TaskEntity entity) {
        entityManager.persist(entity);
        return entity;
    }

    @Override
    public List<TaskEntity> findAllByBoard(int boardId) {
        Query query = entityManager.createQuery("from TaskEntity as task where task.board.id = :boardId");
        query.setParameter("boardId", boardId);
        return query.getResultList();
    }
}
