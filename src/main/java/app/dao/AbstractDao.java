package app.dao;

import java.util.List;

/**
 * Created by andre on 09.04.2017.
 */
public interface AbstractDao<E> {
    public List<E> findAll();
    public E findById(int id);
    public E update(E entity);
    public void delete(E entity);
    public E create(E entity);
}
