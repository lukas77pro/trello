package pl.trello.core;

import org.bson.types.ObjectId;

public class Utils {

    private Utils() {
    }

    public static String generateId() {
        return new ObjectId().toString();
    }
}
