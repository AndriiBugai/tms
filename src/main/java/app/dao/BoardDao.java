package app.dao;

import app.entity.BoardEntity;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface BoardDao extends AbstractDao<BoardEntity> {

    public List<BoardEntity> findByUserId(int userId);
}
