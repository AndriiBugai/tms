package app.dao;

import app.entity.PersonEntity;

public interface UserDao extends AbstractDao<PersonEntity> {
    PersonEntity findUserForSignIn(String login, String password);
    PersonEntity findUserByLogin(String login);
}
