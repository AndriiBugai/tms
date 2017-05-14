package app.dao;

import app.entity.PersonEntity;

public interface UserDao extends AbstractDao<PersonEntity> {
    public PersonEntity findUserForSignIn(String login, String password);
}
