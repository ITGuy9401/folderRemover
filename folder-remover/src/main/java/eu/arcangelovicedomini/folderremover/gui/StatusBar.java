package eu.arcangelovicedomini.folderremover.gui;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.FlowLayout;

import javax.swing.JComponent;

public class StatusBar extends JComponent {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public StatusBar() {
		super();
		Color bg = new Color(241, 241, 241);
		this.setBackground(new Color(0,0,0));
		this.setMaximumSize(new Dimension(Integer.MAX_VALUE, 30));
		this.setPreferredSize(new Dimension(Integer.MAX_VALUE, 30));
		this.setMinimumSize(new Dimension(1, 30));
		this.setLayout(new FlowLayout());
		
	}
}
