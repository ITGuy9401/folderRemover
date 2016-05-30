package eu.arcangelovicedomini.folderremover.util;

import java.awt.Component;
import java.awt.Desktop;
import java.awt.Graphics;
import java.awt.Image;
import java.awt.image.BufferedImage;
import java.net.URI;
import java.net.URL;

import javax.swing.Icon;
import javax.swing.ImageIcon;

import eu.arcangelovicedomini.folderremover.FolderRemover;

public class DesktopUtil {
	
	public static final Icon FOLDER_OPEN_24 = getResizedIcon(getIconFile("folder_open.png"), 24, 24);
	
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
	
	public static ImageIcon getIconFile(String path) { 
			return new ImageIcon(path);
	}
	
	public static ImageIcon getResizedIcon(ImageIcon icon, int width, int height) {
		Image img = icon.getImage();
		BufferedImage bi = new BufferedImage(img.getWidth(null), img.getHeight(null), BufferedImage.TYPE_INT_ARGB);
		
		Graphics g = bi.createGraphics();
		g.drawImage(img, 0, 0, width, height, null);
		
		return new ImageIcon(bi);
	}
}
