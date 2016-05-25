package eu.arcangelovicedomini.folderremover.util;

import java.awt.Desktop;
import java.net.URI;
import java.net.URL;

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
}
