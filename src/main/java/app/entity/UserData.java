package app.entity;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

/**
 * Created by anbu1015 on 5/24/2017.
 */
@Component
@Scope(value="session")
public class UserData {
    private int userId;

    public UserData() {
    }

    public UserData(int userId) {
        this.userId = userId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public void invalidate() {
        userId = 0;
    }
}
