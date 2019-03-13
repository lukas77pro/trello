package pl.trello.core;

public class NotFoundException extends Exception {

    private static final long serialVersionUID = 6770010374115581159L;

    public NotFoundException(String message) {
        super(message);
    }
}
