package app.dao;

import app.entity.PersonEntity;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

public interface UserDao extends AbstractDao<PersonEntity> {
}
