package app.dao;

import app.entity.PersonEntity;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
@Transactional
public class UserDaoImpl implements UserDao {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<PersonEntity> findAll() {
        return entityManager.createQuery("from PersonEntity").getResultList();
    }

    @Override
    public PersonEntity findById(int id) {
        return entityManager.find(PersonEntity.class, id);
    }

    @Override
    public PersonEntity update(PersonEntity entity) {
        entityManager.merge(entity);
        return entity;
    }

    @Override
    public void delete(PersonEntity entity) {
        if (entityManager.contains(entity)) {
            entityManager.remove(entity);
        }
    }

    @Override
    public PersonEntity create(PersonEntity entity) {
        entityManager.persist(entity);
        return entity;
    }
}
