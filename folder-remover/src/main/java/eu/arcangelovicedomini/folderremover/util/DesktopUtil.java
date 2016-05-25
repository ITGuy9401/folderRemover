package eu.arcangelovicedomini.folderremover.util;

import java.awt.Component;
import java.awt.Desktop;
import java.net.URI;
import java.net.URL;

import eu.arcangelovicedomini.folderremover.FolderRemover;

public class DesktopUtil {
	public static void openWebpage(URI uri) throws Exception {
		Desktop desktop = Desktop.isDesktopSupported() ? Desktop.getDesktop() : null;
		if (desktop != null && desktop.isSupported(Desktop.Action.BROWSE)) {
			desktop.browse(uri);
		}
	}

	public static void openWebpage(URL url) throws Exception {
		openWebpage(url.toURI());
	}

	public static void openWebpage(String url) throws Exception {
		openWebpage(new URL(url));
	}

	public static FolderRemover getFolderRemover(Component component) {
		do {
			if (component instanceof FolderRemover) {
				return (FolderRemover) component;
			}
		} while ((component = component.getParent()) != null);
		return null;
	}
}
