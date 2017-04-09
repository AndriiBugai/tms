package app.dao;

import app.entity.BoardEntity;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public interface BoardDao extends AbstractDao<BoardEntity> {
}
