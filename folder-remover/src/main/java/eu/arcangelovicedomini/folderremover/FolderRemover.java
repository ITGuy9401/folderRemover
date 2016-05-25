package eu.arcangelovicedomini.folderremover;

import java.awt.BorderLayout;
import java.awt.Dimension;

import javax.swing.JFrame;

import eu.arcangelovicedomini.folderremover.gui.MainContainer;
import eu.arcangelovicedomini.folderremover.gui.Menu;
import eu.arcangelovicedomini.folderremover.gui.StatusBar;

/**
 * Main class
 */
public class FolderRemover extends JFrame {
	
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	StatusBar statusBar = null;
	
	public FolderRemover() {
		super("FolderRemover - by Arcangelo Vicedomini");
		
		statusBar = new StatusBar();
		
		this.getContentPane().setPreferredSize(new Dimension(640, 480));
		this.setLayout(new BorderLayout());
		this.setJMenuBar(new Menu());
		this.getContentPane().add(new MainContainer(), BorderLayout.CENTER);
		this.getContentPane().add(statusBar, BorderLayout.SOUTH);
		
	}
	
	public static void main(String[] args) {
		FolderRemover mainApp = new FolderRemover();
		mainApp.pack();
		mainApp.setVisible(true);
	}
}
