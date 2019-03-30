package pl.trello.core;

import java.util.List;
import java.util.stream.IntStream;

public class OrderedUtils {

    public static <T extends Ordered> List<T> move(List<T> items, int previousIndex, int currentIndex) {
        T item = items.remove(previousIndex);
        items.add(currentIndex, item);
        return reorder(items);
    }

    public static <T extends Ordered> void move(List<T> source, int previousIndex, List<T> target, int currentIndex) {
        T item = source.remove(previousIndex);
        target.add(currentIndex, item);
        reorder(source);
        reorder(target);
    }

    private static <T extends Ordered> List<T> reorder(List<T> items) {
        IntStream.range(0, items.size()).forEach(index -> items.get(index).setOrder(index));
        return items;
    }
}
