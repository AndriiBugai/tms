package app.dao;

import app.entity.BoardEntity;
import app.entity.TaskEntity;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
@Transactional
public class BoardDaoImpl implements BoardDao {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<BoardEntity> findAll() {
        return entityManager.createQuery("from BoardEntity").getResultList();
    }

    @Override
    public BoardEntity findById(int id) {
        return entityManager.find(BoardEntity.class, id);
    }

    @Override
    public BoardEntity update(BoardEntity entity) {
        entityManager.merge(entity);
        return entity;
    }

    @Override
    public void delete(BoardEntity entity) {
        if (entityManager.contains(entity)) {
            entityManager.remove(entity);
        }
    }

    @Override
    public BoardEntity create(BoardEntity entity) {
        entityManager.persist(entity);
        return entity;
    }
}
