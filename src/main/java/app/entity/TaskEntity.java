package app.entity;

import javax.persistence.*;
import java.sql.Timestamp;

/**
 * Created by andre on 09.04.2017.
 */
@Entity
@Table(name = "task", schema = "public", catalog = "tms")
public class TaskEntity {
    private int id;
    private String name;
    private String description;
    private Timestamp dateCreated;
    private Boolean topPriority;
    private Integer estimation;
    private PersonEntity assigneePerson;
    private PersonEntity creatorPerson;
    private BoardEntity board;

    @Id
    @Column(name = "id", nullable = false)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "name", nullable = false, length = 50)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Basic
    @Column(name = "description", nullable = true, length = 150)
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Basic
    @Column(name = "date_created", nullable = true)
    public Timestamp getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Timestamp dateCreated) {
        this.dateCreated = dateCreated;
    }

    @Basic
    @Column(name = "top_priority", nullable = true)
    public Boolean getTopPriority() {
        return topPriority;
    }

    public void setTopPriority(Boolean topPriority) {
        this.topPriority = topPriority;
    }

    @Basic
    @Column(name = "estimation", nullable = true)
    public Integer getEstimation() {
        return estimation;
    }

    public void setEstimation(Integer estimation) {
        this.estimation = estimation;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        TaskEntity that = (TaskEntity) o;

        if (id != that.id) return false;
        if (name != null ? !name.equals(that.name) : that.name != null) return false;
        if (description != null ? !description.equals(that.description) : that.description != null) return false;
        if (dateCreated != null ? !dateCreated.equals(that.dateCreated) : that.dateCreated != null) return false;
        if (topPriority != null ? !topPriority.equals(that.topPriority) : that.topPriority != null) return false;
        if (estimation != null ? !estimation.equals(that.estimation) : that.estimation != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + (description != null ? description.hashCode() : 0);
        result = 31 * result + (dateCreated != null ? dateCreated.hashCode() : 0);
        result = 31 * result + (topPriority != null ? topPriority.hashCode() : 0);
        result = 31 * result + (estimation != null ? estimation.hashCode() : 0);
        return result;
    }

    @ManyToOne
    @JoinColumn(name = "assigneeid", referencedColumnName = "id")
    public PersonEntity getAssigneePerson() {
        return assigneePerson;
    }

    public void setAssigneePerson(PersonEntity assigneePerson) {
        this.assigneePerson = assigneePerson;
    }

    @ManyToOne
    @JoinColumn(name = "creatorid", referencedColumnName = "id")
    public PersonEntity getCreatorPerson() {
        return creatorPerson;
    }

    public void setCreatorPerson(PersonEntity creatorPerson) {
        this.creatorPerson = creatorPerson;
    }

    @ManyToOne
    @JoinColumn(name = "boardid", referencedColumnName = "id")
    public BoardEntity getBoard() {
        return board;
    }

    public void setBoard(BoardEntity board) {
        this.board = board;
    }
}
