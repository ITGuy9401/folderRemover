package eu.arcangelovicedomini.folderremover.gui;

import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;

import javax.swing.JMenu;
import javax.swing.JMenuBar;
import javax.swing.JMenuItem;

import eu.arcangelovicedomini.folderremover.util.DesktopUtil;

public class Menu extends JMenuBar implements MouseListener {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	JMenuItem projectSite = null;
	JMenuItem searchMe = null;
	JMenu helpMenu = null;

	public Menu() {
		super();
		this.add(getHelpMenu());
	}

	@Override
	public JMenu getHelpMenu() {
		if (helpMenu == null) {
			helpMenu = new JMenu("Help");

			projectSite = new JMenuItem("Visit project website");
			projectSite.addMouseListener(this);
			helpMenu.add(projectSite);

			searchMe = new JMenuItem("Visit my website");
			searchMe.addMouseListener(this);
			helpMenu.add(searchMe);
		}
		
		return helpMenu;
	}

	public void mouseClicked(MouseEvent e) {
	}

	public void mousePressed(MouseEvent e) {
		try {
			if (e.getComponent().equals(projectSite)) {
				DesktopUtil.openWebpage("https://github.com/ITGuy9401/folderRemover/wiki");
			} else if (e.getComponent().equals(searchMe)) {
				DesktopUtil.openWebpage("https://www.arcangelovicedomini.eu");
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	public void mouseReleased(MouseEvent e) {
		// TODO Auto-generated method stub

	}

	public void mouseEntered(MouseEvent e) {
		// TODO Auto-generated method stub

	}

	public void mouseExited(MouseEvent e) {
		// TODO Auto-generated method stub

	}
}
